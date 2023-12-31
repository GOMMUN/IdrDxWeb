package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.Inventory;
import com.idr.pdd.dto.WorkDailyReport;
import com.idr.pdd.mapper.InventoryMapper;
import com.idr.pdd.mapper.WorkDailyReportMapper;

@Service
public class InventoryService {

	@Autowired
	InventoryMapper mapper;
	
	public List<Inventory> findAll(String plant){
		return mapper.findAll(plant);
	}
	
	public int save(Inventory param) {
		if(param.getDataseq() == 0) {
			return mapper.create(param);
		}else {
			return mapper.modify(param);
		}
	}
	
	public int remove(List<Integer> param) {
		return mapper.remove(param);
	}
}
