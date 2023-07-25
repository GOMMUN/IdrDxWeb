package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.Location;
import com.idr.pdd.mapper.LineInfoMapper;

@Service
public class LineInfoService {

	@Autowired
	LineInfoMapper mapper;

	public List<Location> findAll() {
		
		return mapper.findAll();
	}
	
	public int save(Location param) {
		if(param.getDataseq() == 0) {
			int count = mapper.validationcheck(param);
			if (count == 0) {
				return mapper.create(param);
			}
			else {
				throw new IllegalArgumentException("error");
			}
		}else {
			return mapper.modify(param);
		}
	}
	
	public int remove(List<Integer> param) {
		return mapper.remove(param);
	}

	
} 