package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.DxCube;
import com.idr.pdd.mapper.dxValueChainCubeMapper;

@Service
public class dxValueChainCubeService {

	@Autowired
	dxValueChainCubeMapper mapper;

	public List<DxCube> findAll() {
		
		return mapper.findAll();
	}
	
	public int save(DxCube param) {	
		return mapper.save(param);
	}
	
	public int remove(List<DxCube> param) {
		return mapper.remove(param);
	}	
	
} 
