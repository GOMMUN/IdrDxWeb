package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import com.idr.pdd.dto.Storage;
import com.idr.pdd.dto.WorkDailyReport;


@Mapper
public interface StorageInfoMapper {

	List<Storage> findAll();
	
	int create(Storage param);
	int modify(Storage param);
	int remove(List<Integer> param);
}