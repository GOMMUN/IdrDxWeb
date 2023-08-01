package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.Occur;
import com.idr.pdd.dto.Notice;
import com.idr.pdd.dto.Confirm;



@Mapper
public interface AnomalyDetectMapper {

	List<Occur> findO();
	List<Notice> findN();
	List<Confirm> findC();
	
}