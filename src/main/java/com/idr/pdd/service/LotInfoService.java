package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.LotInfo;
import com.idr.pdd.mapper.LotInfoMapper;

@Service
public class LotInfoService {

	@Autowired
	LotInfoMapper mapper;

	public List<LotInfo> findAll() {
		
		return mapper.findAll();
	}
	
	public int save(LotInfo param) {
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