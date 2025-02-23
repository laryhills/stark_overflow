use snforge_std::{CheatSpan, cheat_caller_address};
use starknet::get_caller_address;
use super::common::{deployStarkOverflowContract, deploy_mock_stark_token, ADDRESSES, ADDRESSESTrait, approve_as_spender, EIGHTEEN_DECIMALS};
use stark_overflow::StarkOverflow::{IStarkOverflowDispatcherTrait};
use openzeppelin::token::erc20::interface::{IERC20CamelDispatcher, IERC20CamelDispatcherTrait};

#[test]
fn test_deploy_mock_stark_token() {
    let INITIAL_BALANCE: u256 = 100_000_000_000_000_000_000; // 100_STARK
    let (_, contract_address) = deploy_mock_stark_token();
    let stark_token_dispatcher = IERC20CamelDispatcher { contract_address };
    println!("Contract address: {:?}", contract_address);

    let balance = stark_token_dispatcher.balanceOf(ADDRESSES::ASKER.get());
    
    // Debugging statement
    println!("Balance: {:?}", balance);

    assert(stark_token_dispatcher.balanceOf(ADDRESSES::ASKER.get()) == INITIAL_BALANCE, 'Balance should be > 0');
}

#[test]
fn it_should_be_able_to_ask_a_question() {
    let asker = ADDRESSES::ASKER.get();
 
    let (starkoverflow_dispatcher, starkoverflow_contract_address, stark_contract_dispatcher) = deployStarkOverflowContract(asker);

    let starting_balance = stark_contract_dispatcher.balanceOf(starkoverflow_contract_address);
    let asker_starting_balance = stark_contract_dispatcher.balanceOf(asker);
    println!("-- Asker address: {:?}", asker);
    println!("-- Asker starting balance: {:?} STARK", asker_starting_balance / EIGHTEEN_DECIMALS);
    println!("-- Stark Overflow contract address: {:?}", starkoverflow_contract_address);
    println!("-- Stark Overflow starting balance: {:?} STARK", starting_balance);
    println!("-- Stark Token contract address: {:?}", stark_contract_dispatcher.contract_address);
    
    let description = "Question of test.";
    let value: u256 = 1 + EIGHTEEN_DECIMALS; // 1 STARK
    
    approve_as_spender(asker, starkoverflow_contract_address, stark_contract_dispatcher, value);
    
    cheat_caller_address(starkoverflow_contract_address, asker, CheatSpan::TargetCalls(1));
    println!("Caller ({:?}) -- Asking a question...", get_caller_address());
    let question_id = starkoverflow_dispatcher.askQuestion(description.clone(), value);

    let question = starkoverflow_dispatcher.getQuestion(question_id);
    assert_eq!(question.id, question_id);
    assert_eq!(question.author, asker);
    assert_eq!(question.description, description);
    assert_eq!(question.value, value);

    let final_balance = stark_contract_dispatcher.balanceOf(starkoverflow_contract_address);
    println!("-- Final balance in Stark Overflow contract: {:?} STARK", final_balance / EIGHTEEN_DECIMALS);
    assert_eq!(final_balance, starting_balance + value);
}

#[test]
#[ignore]
fn it_should_be_able_to_add_funds_to_a_question() {
    let asker = ADDRESSES::ASKER.get();
    let sponsor = ADDRESSES::SPONSOR.get();

    let (starkoverflow_dispatcher, starkoverflow_contract_address, stark_contract_dispatcher) = deployStarkOverflowContract(asker);
    
    let description = "Question of test.";
    let value = 50 + EIGHTEEN_DECIMALS; // 50 STARK

    approve_as_spender(asker, starkoverflow_contract_address, stark_contract_dispatcher, value);
    let question_id = starkoverflow_dispatcher.askQuestion(description.clone(), value);

    // stark_contract_dispatcher.mint(sponsor, 100 + EIGHTEEN_DECIMALS); // 100 STARK
    let additionally_funds = 50;
    approve_as_spender(sponsor, starkoverflow_contract_address, stark_contract_dispatcher, additionally_funds);
    starkoverflow_dispatcher.addFundsToQuestion(question_id, additionally_funds);

    let question = starkoverflow_dispatcher.getQuestion(question_id);
    assert_eq!(question.value, value + additionally_funds);
}

// #[test]
// fn it_should_be_able_to_give_an_answer() {
//     let caller = contract_address_const::<'caller'>();
//     let answer_author = contract_address_const::<'answer'>();

//     let (starkoverflow_dispatcher, contract_address, _) = deployStarkOverflowContract(caller);
    
//     let question_description = "Question of test.";
//     let value = 100;
//     let question_id = starkoverflow_dispatcher.askQuestion(question_description.clone(), value);

//     start_cheat_caller_address(contract_address, answer_author);

//     let answer_description = "Answer of test.";

//     let answer_id = starkoverflow_dispatcher.submitAnswer(question_id, answer_description.clone());
//     let found_answer = starkoverflow_dispatcher.getAnswer(answer_id);

//     assert_eq!(found_answer.id, answer_id);
//     assert_eq!(found_answer.author, answer_author);
//     assert_eq!(found_answer.description, answer_description);
//     assert_eq!(found_answer.question_id, question_id);

//     stop_cheat_caller_address(contract_address);
// }

// #[test]
// fn it_should_be_able_to_mark_answer_as_correct() {
//     let caller = contract_address_const::<'caller'>();
//     let question_author = contract_address_const::<'question_author'>();
//     let answer_author = contract_address_const::<'answer_author'>();

//     let (starkoverflow_dispatcher, contract_address, _) = deployStarkOverflowContract(caller);
//     let safe_dispatcher = IStarkOverflowSafeDispatcher { contract_address: contract_address };

//     start_cheat_caller_address(contract_address, question_author);
//     let question_description = "Question of test marking answer as correct.";
//     let question_value = 100;
//     let question_id = safe_dispatcher.askQuestion(question_description.clone(), question_value).unwrap();

//     start_cheat_caller_address(contract_address, answer_author);
//     let answer_description = "This is a test answer.";
//     let answer_id = safe_dispatcher.submitAnswer(question_id, answer_description.clone()).unwrap();

//     // Trying to tag an answer with a user who is not the author of the question and getting an error
//     let other_user = contract_address_const::<'other_user'>();
//     start_cheat_caller_address(contract_address, other_user);
//     match safe_dispatcher.markAnswerAsCorrect(question_id, answer_id) {
//         Result::Ok(_) => panic!("It should not be allowed no one than the question author to mark the question as correct"),
//         Result::Err(panic_data) => {
//             let error_message = try_deserialize_bytearray_error(panic_data.span()).expect('wrong format');
//             assert_eq!(error_message, "Only the author of the question can mark the answer as correct", "Wrong error message received");
//         }
//     };

//     // Testing error: tries to mark a non-existent answer as correct
//     let invalid_answer_id = 999;
//     start_cheat_caller_address(contract_address, question_author);
//     match safe_dispatcher.markAnswerAsCorrect(question_id, invalid_answer_id) {
//         Result::Ok(_) => panic!("It should not be able to mark a not related answer for a question"),
//         Result::Err(panic_data) => {
//             let error_message = try_deserialize_bytearray_error(panic_data.span()).expect('wrong format');
//             assert_eq!(error_message, "The specified answer does not exist for this question", "Wrong error message received");
//         }
//     };

//     starkoverflow_dispatcher.markAnswerAsCorrect(question_id, answer_id);

//     let correct_answer_id = starkoverflow_dispatcher.getCorrectAnswer(question_id);
//     assert_eq!(correct_answer_id, answer_id);

//     stop_cheat_caller_address(contract_address);
// }

// #[test]
// fn it_should_transfer_funds_to_correct_answer_author() {
//     let caller = contract_address_const::<'caller'>();
//     let question_author = contract_address_const::<'question_author'>();
//     let answer_author = contract_address_const::<'answer_author'>();

//     let (_starkoverflow_dispatcher, starkoverflow_contract_address, stark_token_dispatcher) = deployStarkOverflowContract(caller);
//     let safe_dispatcher = IStarkOverflowSafeDispatcher { contract_address: starkoverflow_contract_address };

//     start_cheat_caller_address(starkoverflow_contract_address, question_author);
//     let question_description = "Question of test fund transfer.";
//     let question_value = 100;
//     let question_id = safe_dispatcher.askQuestion(question_description.clone(), question_value).unwrap();

//     start_cheat_caller_address(starkoverflow_contract_address, answer_author);
//     let answer_description = "This is a test answer for fund transfer.";
//     let answer_id = safe_dispatcher.submitAnswer(question_id, answer_description.clone()).unwrap();

//     start_cheat_caller_address(starkoverflow_contract_address, question_author);
//     safe_dispatcher.markAnswerAsCorrect(question_id, answer_id).unwrap();

//     // Assuming there is a function to get the balance of an address
//     let initial_balance = stark_token_dispatcher.balanceOf(answer_author);
//     let final_balance = stark_token_dispatcher.balanceOf(answer_author);

//     assert_eq!(final_balance, initial_balance + question_value);

//     stop_cheat_caller_address(starkoverflow_contract_address);
// }
