package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.Storage;
import com.idr.pdd.mapper.StorageInfoMapper;

@Service
public class StorageInfoService {

	@Autowired
	StorageInfoMapper mapper;

	public List<Storage> findAll() {
		
		return mapper.findAll();
	}
	
	public int save(Storage param) {
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