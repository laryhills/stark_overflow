use starknet::ContractAddress;

pub enum QuestionStatus {
    Open,
    Resolved,
}

pub struct Question {
    id: u256,
    author: ContractAddress,
    description: ByteArray,
    value: u256,
    status: QuestionStatus,
}

pub struct Answer {
    id: u256,
    author: ContractAddress,
    description: ByteArray,
}