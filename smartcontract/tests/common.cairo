use snforge_std::DeclareResultTrait;
use stark_overflow::StarkOverflow::{IStarkOverflowDispatcher};
use starknet::{ContractAddress};
use snforge_std::{declare, ContractClassTrait};

pub fn deployStarkOverflowContract(owner: ContractAddress) -> (IStarkOverflowDispatcher, ContractAddress) {
    let declared_contract = declare("StarkOverflow").unwrap();
    let contract_class = declared_contract.contract_class();

    let constructor_calldata: Array<felt252> = array![owner.into()];

    let (contract_address, _) = contract_class.deploy(@constructor_calldata).unwrap();
    let dispatcher = IStarkOverflowDispatcher { contract_address };
    
    println!("-- Stark Overflow contract deployed on: {:?}", contract_address);
    
    (dispatcher, contract_address)
}