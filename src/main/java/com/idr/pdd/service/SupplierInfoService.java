package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.Vendor;
import com.idr.pdd.mapper.SupplierInfoMapper;

@Service
public class SupplierInfoService {

	@Autowired
	SupplierInfoMapper mapper;

	public List<Vendor> findAll() {
		
		return mapper.findAll();
	}
	
	public int save(Vendor param) {
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
