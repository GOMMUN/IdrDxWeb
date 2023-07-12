package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.CM0501;
import com.idr.pdd.mapper.ModelVehicleInfoMapper;


@Service
public class ModelVehicleInfoService {

	@Autowired
	ModelVehicleInfoMapper mapper;

	public List<CM0501> findAll() {
		
		return mapper.findAll();
	}
	
	public int save(CM0501 param) {	
		return mapper.merge(param);
	}
	
	public int remove(List<CM0501> param) {
		return mapper.remove(param);
	}	
	
}
