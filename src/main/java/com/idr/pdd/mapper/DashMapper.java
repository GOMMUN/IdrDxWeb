package com.idr.pdd.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.WorkContents;
import com.idr.pdd.dto.FairProd;
import com.idr.pdd.dto.RejectContents;
import com.idr.pdd.dto.Dash;

@Mapper
public interface DashMapper {

	List<Dash> findAllPQCD();
	List<RejectContents> findAllR(RejectContents param);
	List<FairProd> chart1(String factory, String month);
	List<String> rank(String factory);

}