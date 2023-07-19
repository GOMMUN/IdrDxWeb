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
	
	public int checkCnt(Vendor param) {
		
		return mapper.checkCnt(param);
	}
	
	public int save(Vendor param) {	
		return mapper.save(param);
	}
	
	public int remove(List<Vendor> param) {
		return mapper.remove(param);
	}		
}
