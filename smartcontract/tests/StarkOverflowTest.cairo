use starknet::{contract_address_const};
use snforge_std::{start_cheat_caller_address, stop_cheat_caller_address, byte_array::try_deserialize_bytearray_error};
use super::common::{deployStarkOverflowContract};
use stark_overflow::StarkOverflow::{IStarkOverflowDispatcherTrait, IStarkOverflowSafeDispatcher, IStarkOverflowSafeDispatcherTrait};

#[test]
fn it_should_be_able_to_ask_a_question() {
    let caller = contract_address_const::<'caller'>();
    
    let (dispatcher, contract_address) = deployStarkOverflowContract(caller);
    start_cheat_caller_address(contract_address, caller);

    let description = "Question of test.";
    let value = 100;
    let question_id = dispatcher.askQuestion(description.clone(), value);

    let question = dispatcher.getQuestion(question_id);
    assert_eq!(question.id, question_id);
    assert_eq!(question.author, caller);
    assert_eq!(question.description, description);
    assert_eq!(question.value, value);
    
    stop_cheat_caller_address(contract_address);
}

#[test]
fn it_should_be_able_to_add_funds_to_a_question() {
    let caller = contract_address_const::<'caller'>();

    let (dispatcher, _) = deployStarkOverflowContract(caller);
    
    let description = "Question of test.";
    let value = 100;
    let question_id = dispatcher.askQuestion(description.clone(), value);

    let additionally_funds = 50;
    dispatcher.addFundsToQuestion(question_id, additionally_funds);

    let question = dispatcher.getQuestion(question_id);
    assert_eq!(question.value, value + additionally_funds);
}

#[test]
fn it_should_be_able_to_give_an_answer() {
    let caller = contract_address_const::<'caller'>();
    let answer_author = contract_address_const::<'answer'>();

    let (dispatcher, contract_address) = deployStarkOverflowContract(caller);
    
    let question_description = "Question of test.";
    let value = 100;
    let question_id = dispatcher.askQuestion(question_description.clone(), value);

    start_cheat_caller_address(contract_address, answer_author);

    let answer_description = "Answer of test.";

    let answer_id = dispatcher.submitAnswer(question_id, answer_description.clone());
    let found_answer = dispatcher.getAnswer(answer_id);

    assert_eq!(found_answer.id, answer_id);
    assert_eq!(found_answer.author, answer_author);
    assert_eq!(found_answer.description, answer_description);
    assert_eq!(found_answer.question_id, question_id);

    stop_cheat_caller_address(contract_address);
}

#[test]
fn it_should_be_able_to_mark_answer_as_correct() {
    let caller = contract_address_const::<'caller'>();
    let question_author = contract_address_const::<'question_author'>();
    let answer_author = contract_address_const::<'answer_author'>();

    let (dispatcher, contract_address) = deployStarkOverflowContract(caller);
    let safe_dispatcher = IStarkOverflowSafeDispatcher { contract_address: contract_address };

    start_cheat_caller_address(contract_address, question_author);
    let question_description = "Question of test marking answer as correct.";
    let question_value = 100;
    let question_id = safe_dispatcher.askQuestion(question_description.clone(), question_value).unwrap();

    start_cheat_caller_address(contract_address, answer_author);
    let answer_description = "This is a test answer.";
    let answer_id = safe_dispatcher.submitAnswer(question_id, answer_description.clone()).unwrap();

    // Trying to tag an answer with a user who is not the author of the question and getting an error
    let other_user = contract_address_const::<'other_user'>();
    start_cheat_caller_address(contract_address, other_user);
    match safe_dispatcher.markAnswerAsCorrect(question_id, answer_id) {
        Result::Ok(_) => panic!("It should not be allowed no one than the question author to mark the question as correct"),
        Result::Err(panic_data) => {
            let error_message = try_deserialize_bytearray_error(panic_data.span()).expect('wrong format');
            assert_eq!(error_message, "Only the author of the question can mark the answer as correct", "Wrong error message received");
        }
    };

    // Testing error: tries to mark a non-existent answer as correct
    let invalid_answer_id = 999;
    start_cheat_caller_address(contract_address, question_author);
    match safe_dispatcher.markAnswerAsCorrect(question_id, invalid_answer_id) {
        Result::Ok(_) => panic!("It should not be able to mark a not related answer for a question"),
        Result::Err(panic_data) => {
            let error_message = try_deserialize_bytearray_error(panic_data.span()).expect('wrong format');
            assert_eq!(error_message, "The specified answer does not exist for this question", "Wrong error message received");
        }
    };

    dispatcher.markAnswerAsCorrect(question_id, answer_id);

    let correct_answer_id = dispatcher.getCorrectAnswer(question_id);
    assert_eq!(correct_answer_id, answer_id);

    stop_cheat_caller_address(contract_address);
}

#[test]
fn it_should_transfer_funds_to_correct_answer_author() {
    let caller = contract_address_const::<'caller'>();
    let question_author = contract_address_const::<'question_author'>();
    let answer_author = contract_address_const::<'answer_author'>();

    let (dispatcher, contract_address) = deployStarkOverflowContract(caller);
    let safe_dispatcher = IStarkOverflowSafeDispatcher { contract_address: contract_address };

    start_cheat_caller_address(contract_address, question_author);
    let question_description = "Question of test fund transfer.";
    let question_value = 100;
    let question_id = safe_dispatcher.askQuestion(question_description.clone(), question_value).unwrap();

    start_cheat_caller_address(contract_address, answer_author);
    let answer_description = "This is a test answer for fund transfer.";
    let answer_id = safe_dispatcher.submitAnswer(question_id, answer_description.clone()).unwrap();

    start_cheat_caller_address(contract_address, question_author);
    dispatcher.markAnswerAsCorrect(question_id, answer_id);

    // Assuming there is a function to get the balance of an address
    let initial_balance = dispatcher.getBalance(answer_author);
    dispatcher.transferFundsToCorrectAnswerAuthor(question_id);
    let final_balance = dispatcher.getBalance(answer_author);

    assert_eq!(final_balance, initial_balance + question_value);

    stop_cheat_caller_address(contract_address);
}
