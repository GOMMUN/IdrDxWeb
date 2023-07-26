package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.Material;
import com.idr.pdd.mapper.MaterialMasterMapper;



@Service
public class MaterialMasterService {

	@Autowired
	MaterialMasterMapper mapper;
	
	public List<Material> findAll() {
		
		return mapper.findAll();
	}
	
	public int save(Material param) {
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
