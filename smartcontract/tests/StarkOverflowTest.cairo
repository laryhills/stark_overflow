use starknet::{contract_address_const};
use snforge_std::{start_cheat_caller_address, stop_cheat_caller_address};
use super::common::{deployStarkOverflowContract};
use stark_overflow::StarkOverflow::{IStarkOverflowDispatcherTrait};

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