package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.Shift;


@Mapper
public interface GroupShiftInfoMapper {

	List<Shift> findAll();

	int create(Shift param);
	int modify(Shift param);;
	int remove(List<Integer> param);
}
