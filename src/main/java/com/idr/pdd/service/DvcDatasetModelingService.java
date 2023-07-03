package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.idr.pdd.dto.CM0501;
import com.idr.pdd.dto.CM0701;
import com.idr.pdd.mapper.DvcDatasetModelingMapper;
import com.idr.pdd.mapper.ModelVehicleInfoMapper;


@Service
public class DvcDatasetModelingService {

	@Autowired
	DvcDatasetModelingMapper mapper;

	public List<CM0701> findAll() {
		
		return mapper.findAll();
	}
}
