package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.NotoperateContents;
import com.idr.pdd.dto.RejectContents;

@Mapper
public interface RejectContentsMapper {

	List<RejectContents> findAll(RejectContents contents);
	RejectContents find();
}
