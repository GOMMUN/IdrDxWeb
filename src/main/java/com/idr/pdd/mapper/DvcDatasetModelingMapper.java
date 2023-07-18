package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.CM0701;



@Mapper
public interface DvcDatasetModelingMapper {

	List<CM0701> findAxis();
	
	List<CM0701> findGroup(CM0701 param);
	
	int save(CM0701 param);
	int remove(List<CM0701> param);
}
