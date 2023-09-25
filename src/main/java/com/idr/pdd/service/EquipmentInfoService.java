package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.Equipment;
import com.idr.pdd.mapper.EquipmentInfoMapper;

@Service
public class EquipmentInfoService {

	@Autowired
	EquipmentInfoMapper mapper;

	public List<Equipment> findAll() {
		
		return mapper.findAll();
	}
	
	public List<Equipment> findByFactoryid(){
		return mapper.findByFactoryid();
	}
	
	public int save(Equipment param) {
		if(param.getDataseq() == 0) {
			return mapper.create(param);
		} else {
			return mapper.modify(param);
		}
	}
	
	public int remove(List<Integer> param) {
		return mapper.remove(param);
	}

	
} 