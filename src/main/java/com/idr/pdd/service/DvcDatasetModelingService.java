package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.CM0701;
import com.idr.pdd.mapper.DvcDatasetModelingMapper;


@Service
public class DvcDatasetModelingService {

	@Autowired
	DvcDatasetModelingMapper mapper;

	public List<CM0701> findAxis() {
		
		return mapper.findAxis();
	}
	
	public List<CM0701> findGroup(CM0701 param) {
		
		return mapper.findGroup(param);
	}
	
	public int save(CM0701 param) {
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
