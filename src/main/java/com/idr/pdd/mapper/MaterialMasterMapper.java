package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.Code;
import com.idr.pdd.dto.Material;



@Mapper
public interface MaterialMasterMapper {

	List<Material> findAll();
	
	int create(Material param);
	int modify(Material param);
	int remove(List<Integer> param);
}
