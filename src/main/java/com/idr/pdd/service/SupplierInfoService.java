package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.idr.pdd.dto.CM0801;
import com.idr.pdd.dto.Vendor;
import com.idr.pdd.mapper.DatasetDetailedMapper;
import com.idr.pdd.mapper.SupplierInfoMapper;



@Service
public class SupplierInfoService {

	@Autowired
	SupplierInfoMapper mapper;

	public List<Vendor> findAll() {
		
		return mapper.findAll();
	}
}
