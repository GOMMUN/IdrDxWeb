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
	
	public List<Material> findMateriaMasterAll(Material data) {
		
		return mapper.findMateriaMasterAll(data);
	}
	
	public int checkCnt(Material param) {
		
		return mapper.checkCnt(param);
	}
	
	public int save(Material param) {	
		return mapper.save(param);
	}
	
	public int remove(List<Material> param) {
		return mapper.remove(param);
	}
	
}
