package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.Vendor;



@Mapper
public interface SupplierInfoMapper {

	List<Vendor> findAll();
	int checkCnt(Vendor param);
	
	int save(Vendor param);
	int remove(List<Vendor> param);
}
