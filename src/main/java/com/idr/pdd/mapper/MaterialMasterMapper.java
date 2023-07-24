package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.Code;
import com.idr.pdd.dto.Material;



@Mapper
public interface MaterialMasterMapper {

	List<Material> findAll();
	List<Material> findMateriaMasterAll(Material data);
	int checkCnt(Material param);
	
	int save(Material param);
	int remove(List<Material> param);
}
