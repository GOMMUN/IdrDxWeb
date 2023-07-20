package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;



import com.idr.pdd.dto.CM0801;
import com.idr.pdd.dto.Code;
import com.idr.pdd.dto.Material;
import com.idr.pdd.dto.Vendor;



@Mapper
public interface MaterialMasterMapper {

	List<Material> findAll();
	
}
