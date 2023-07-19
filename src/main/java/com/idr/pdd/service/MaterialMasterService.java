package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.idr.pdd.dto.CM0801;
import com.idr.pdd.dto.Code;
import com.idr.pdd.dto.Material;
import com.idr.pdd.dto.Vendor;
import com.idr.pdd.mapper.DatasetDetailedMapper;
import com.idr.pdd.mapper.MaterialMasterMapper;
import com.idr.pdd.mapper.SupplierInfoMapper;



@Service
public class MaterialMasterService {

	@Autowired
	MaterialMasterMapper mapper;

	public List<Code> findAll(Material data) {
		
		return mapper.findAll(data);
	}
}
