package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.Factory;
import com.idr.pdd.mapper.FactoryInfoMapper;


@Service
public class FactoryInfoService {

	@Autowired
	FactoryInfoMapper  mapper;
	
	public List<Factory> findAll(){
		return mapper.findAll();
	}
	
	public int save(Factory param) {	
		if(param.getDataseq() == 0) {
			return mapper.create(param);
		}else {
			return mapper.modify(param);
		}
	}
	
	public int remove(List<Integer> param) {
		return mapper.remove(param);
	}
}
