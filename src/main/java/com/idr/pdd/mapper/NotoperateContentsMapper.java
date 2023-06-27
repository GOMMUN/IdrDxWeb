package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.NotoperateContents;

@Mapper
public interface NotoperateContentsMapper {

	List<NotoperateContents> findAll(NotoperateContents contents);
	NotoperateContents find();
}
