use stark_overflow::structs::{Question, Answer, QuestionStatus};
use openzeppelin::token::erc20::interface::{IERC20CamelDispatcher, IERC20CamelDispatcherTrait};

#[starknet::interface]
pub trait IStarkOverflow<T> {
    fn askQuestion(ref self: T, description: ByteArray, value: u256) -> u256;
    fn getQuestion(self: @T, question_id: u256) -> Question;
    fn addFundsToQuestion(ref self: T, question_id: u256, value: u256);
    fn submitAnswer(ref self: T, question_id: u256, description: ByteArray) -> u256;
    fn getAnswer(self: @T, answer_id: u256) -> Answer;
    fn markAnswerAsCorrect(ref self: T, question_id: u256, answer_id: u256);
    fn getCorrectAnswer(self: @T, question_id: u256) -> u256;

    // Getters
    // fn withdrawFunds(ref self: T, amount: u256);
}

#[starknet::contract]
pub mod StarkOverflow {
    use super::IStarkOverflow;
    use super::{Question, Answer, QuestionStatus};
    use super::{IERC20CamelDispatcher, IERC20CamelDispatcherTrait};
    use starknet::{get_caller_address, ContractAddress, get_contract_address};
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map};
    use openzeppelin::access::ownable::OwnableComponent;
    use stark_overflow::events::{QuestionAnswered, ChosenAnswer};
    use stark_overflow::utils::{generate_question_id, generate_answer_id};

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;
    impl InternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        QuestionAnswered: QuestionAnswered,
        ChosenAnswer: ChosenAnswer,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
    }

    #[storage]
    struct Storage {
        questions: Map<u256, Question>,
        answers: Map<u256, Answer>,
        questionIdAnswerId: Map<u256, u256>,
        stark_token_dispatcher: IERC20CamelDispatcher,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        stark_contract_address: ContractAddress,
    ) {
        self.ownable.initializer(get_contract_address());
        self.stark_token_dispatcher.write(IERC20CamelDispatcher { contract_address: stark_contract_address});
    }

    #[abi(embed_v0)]
    impl StarkOverflow of super::IStarkOverflow<ContractState> {
        fn askQuestion(ref self: ContractState, description: ByteArray, value: u256) -> u256 {
            let caller = get_caller_address();
            let question_id = generate_question_id();
            let _question = Question { id: question_id, author: caller, description, value, status: QuestionStatus::Open };
            self._stark_token_dispatcher().transferFrom(caller, self.ownable.owner(), value);
            
            self.questions.entry(question_id).write(_question);
            question_id
        }

        fn getQuestion(self: @ContractState, question_id: u256) -> Question {
            let found_question = self.questions.entry(question_id).read();
            found_question
        }

        fn addFundsToQuestion(ref self: ContractState, question_id: u256, value: u256) {
            let mut found_question = self.questions.entry(question_id).read();
            found_question.value += value;
            self._stark_token_dispatcher().transferFrom(get_caller_address(), self.ownable.owner(), value);

            self.questions.entry(question_id).write(found_question);
        }

        fn submitAnswer(ref self: ContractState, question_id: u256, description: ByteArray) -> u256 {
            let caller = get_caller_address();
            let answer_id = generate_answer_id();
            let answer = Answer { id: answer_id, author: caller, description, question_id };

            self.answers.entry(answer_id).write(answer);

            answer_id
        }

        fn getAnswer(self: @ContractState, answer_id: u256) -> Answer {
            let found_answer = self.answers.entry(answer_id).read();
            found_answer
        }

        fn markAnswerAsCorrect(ref self: ContractState, question_id: u256, answer_id: u256) {
            let caller = get_caller_address();
            let question_author = self.getQuestion(question_id).author;

            assert!(caller == question_author, "Only the author of the question can mark the answer as correct");

            let found_answer = self.getAnswer(answer_id);
            assert!(found_answer.question_id == question_id, "The specified answer does not exist for this question");

            let found_question = self.questions.entry(question_id).read();
            assert!(found_question.status == QuestionStatus::Open, "The question is already resolved");

            self.questions.entry(question_id).write(Question { status: QuestionStatus::Resolved, ..found_question });
            self.questionIdAnswerId.entry(question_id).write(answer_id);

            self._transferFundsToCorrectAnswerAuthor(question_id);
        }

        fn getCorrectAnswer(self: @ContractState, question_id: u256) -> u256 {
            let found_corret_answer_id = self.questionIdAnswerId.entry(question_id).read();
            found_corret_answer_id
        }

    }
    
    #[generate_trait]
    impl InternalFunctions of InternalFunctionsTrati {
        fn _transferFundsToCorrectAnswerAuthor(ref self: ContractState, question_id: u256) {
            let question = self.getQuestion(question_id);
            assert!(question.status == QuestionStatus::Resolved, "The question is not resolved yet");
            
            let correct_answer_id = self.getCorrectAnswer(question_id);
            let correct_answer = self.getAnswer(correct_answer_id);
            self._stark_token_dispatcher().transferFrom(self.ownable.owner(), correct_answer.author, question.value);
        }        
        
        fn _stark_token_dispatcher(self: @ContractState) -> IERC20CamelDispatcher {
            self.stark_token_dispatcher.read()
        }
    }
}