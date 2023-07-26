package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.LogisticsInfo;
import com.idr.pdd.mapper.LogisticsInfoMapper;

@Service
public class LogisticsInfoService {

	@Autowired
	LogisticsInfoMapper mapper;

	public List<LogisticsInfo> findAll() {
		
		return mapper.findAll();
	}
	
	public int save(LogisticsInfo param) {
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