package com.idr.pdd.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.AnomalyDetection;
import com.idr.pdd.dto.NelsonruleSetting;

@Mapper
public interface AnomalyDetectionMapper {

	int modify(Map<String, String> param);
	int modify2(Map<String, String> param);
	int modify3(Map<String, String> param);
	
	
	int nelsonModifyProd1(Map<String, String> param);
	int nelsonModifyProd2(Map<String, String> param);
	int nelsonModifyProd3(Map<String, String> param);
	int nelsonModifyProd4(Map<String, String> param);
	int nelsonModifyProd5(Map<String, String> param);
	int nelsonModifyProd6(Map<String, String> param);
	int nelsonModifyProd7(Map<String, String> param);
	int nelsonModifyProd8(Map<String, String> param);

	int nelsonModifyFail1(Map<String, String> param);
	int nelsonModifyFail2(Map<String, String> param);
	int nelsonModifyFail3(Map<String, String> param);
	int nelsonModifyFail4(Map<String, String> param);
	int nelsonModifyFail5(Map<String, String> param);
	int nelsonModifyFail6(Map<String, String> param);
	int nelsonModifyFail7(Map<String, String> param);
	int nelsonModifyFail8(Map<String, String> param);
	
	List<AnomalyDetection> find();
	List<NelsonruleSetting> findN();
}
