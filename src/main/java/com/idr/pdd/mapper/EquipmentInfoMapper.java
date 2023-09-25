package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import com.idr.pdd.dto.Equipment;
import com.idr.pdd.dto.WorkDailyReport;


@Mapper
public interface EquipmentInfoMapper {

	List<Equipment> findAll();
	
	List<Equipment> findByFactoryid();
	
	int create(Equipment param);
	int modify(Equipment param);
	int remove(List<Integer> param);
}