package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.DxCube;


@Mapper
public interface dxValueChainCubeMapper {

	List<DxCube> findAll();
	
	int save(DxCube param);
	int remove(List<DxCube> param);
}
