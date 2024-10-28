use stark_overflow::StarkOverflow::{IStarkOverflowDispatcher};
use starknet::{ContractAddress};
use snforge_std::{declare, ContractClassTrait};

pub fn deployStarkOverflowContract(owner: ContractAddress) -> (IStarkOverflowDispatcher, ContractAddress) {
    let class_hash = declare("StarkOverflow").unwrap();

    let mut constructor_calldata = array![owner.into()];

    let (contract_address, _) = class_hash.deploy(@constructor_calldata).unwrap();
    let dispatcher = IStarkOverflowDispatcher { contract_address };
    println!("-- Stark Overflow contract deployed on: {:?}", contract_address);
    
    (dispatcher, contract_address)
}