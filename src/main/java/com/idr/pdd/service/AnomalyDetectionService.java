package com.idr.pdd.service;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.idr.pdd.dto.AnomalyDetection;
import com.idr.pdd.dto.NelsonruleSetting;
import com.idr.pdd.mapper.AnomalyDetectionMapper;

@Service
public class AnomalyDetectionService {

	@Autowired
	AnomalyDetectionMapper mapper;

	public int modify(Map<String, String>  param) {
		
		if(mapper.modify(param)==1 && mapper.modify2(param)==1 && mapper.modify3(param)==1 &&
			mapper.nelsonModifyProd1(param)==1 && mapper.nelsonModifyProd2(param)==1 && mapper.nelsonModifyProd3(param)==1 && mapper.nelsonModifyProd4(param)==1 && 
			mapper.nelsonModifyProd5(param)==1 && mapper.nelsonModifyProd6(param)==1 && mapper.nelsonModifyProd7(param)==1 && mapper.nelsonModifyProd8(param)==1 &&
			mapper.nelsonModifyFail1(param)==1 && mapper.nelsonModifyFail2(param)==1 && mapper.nelsonModifyFail3(param)==1 && mapper.nelsonModifyFail4(param)==1 &&
			mapper.nelsonModifyFail5(param)==1 && mapper.nelsonModifyFail6(param)==1 && mapper.nelsonModifyFail7(param)==1 && mapper.nelsonModifyFail8(param)==1
		){
			return 1;
		}
		else {
			return -1;
		}
		
	}
	
	public List<AnomalyDetection> find() {
		return mapper.find();
	}
	
	public List<NelsonruleSetting> findN() {
		return mapper.findN();
	}
}
