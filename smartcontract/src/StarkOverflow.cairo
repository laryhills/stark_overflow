use openzeppelin::access::ownable::OwnableComponent;

#[starknet::interface]
pub trait IStarkOverflow<T> {
    fn askQuestion(ref self: T, description: ByteArray, value: u256) -> u256;
    fn addFundsToQuestion(ref self: T, questionId: u256, value: u256);
    fn submitAnswer(ref self: T, questionId: u256, answer: ByteArray);
    fn markAnswerAsCorrect(ref self: T, questionId: u256, answerId: u256);
    fn withdrawFunds(ref self: T, amount: u256);
}

#[starknet::contract]
pub mod StarkOverflow {
    use stark_overflow::structs::{Question, Answer, QuestionStatus};
    use stark_overflow::events::{};
    use openzeppelin_access::ownable::OwnableComponent;
    use starknet::{get_caller_address}

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;
    impl InternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        questions: Map<u256, Question>,
        answers: Map<u256, Answer>,
        questionIdAnswerId: Map<u256, u256>,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.ownable.initializer(owner);
    }

    #[abi(embed_v0)]
    impl StarkOverflow of IStarkOverflow<ContractState> {
        fn askQuestion(ref self: T, description: ByteArray, value: u256) -> u256 {
            let caller = get_caller_address();
            let question = Question { id: questionId, author: caller, description, value, status: QuestionStatus::Open };
            
            self.questions.write(questionId, question);
            questionid
        };
    }

}