#[event]
#[Derive(Drop, starknet::Event)]
pub enum Event {
    QuestionAnswered: QuestionAnswered,
    ChosenAnswer: ChosenAnswer,
    #[flat]
    OwnableEvent: OwnableComponent::Event,
}