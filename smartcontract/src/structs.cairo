use starknet::ContractAddress;

#[derive(Drop, Serde, starknet::Store)]
pub enum QuestionStatus {
    Open,
    Resolved,
}

#[derive(Drop, Serde, starknet::Store)]
pub struct Question {
    pub id: u256,
    pub author: ContractAddress,
    pub description: ByteArray,
    pub value: u256,
    pub status: QuestionStatus,
}

#[derive(Drop, Serde, starknet::Store)]
pub struct Answer {
    pub id: u256,
    pub author: ContractAddress,
    pub description: ByteArray,
}
