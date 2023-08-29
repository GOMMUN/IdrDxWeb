package com.idr.pdd.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.FairProd;

@Mapper
public interface DashMapper {

	List<FairProd> findAllName(String factory);
	List<FairProd> findAllPQCD(String factory);
	List<FairProd> chart125(String factory, String month);
	List<FairProd> chart3(String factory, String month);
	List<FairProd> chart4(String factory, String month);
	List<FairProd> chart6(String factory, String month);
	List<FairProd> chart8(String month);
	List<String> rank(String factory);

	String find1Alarm();
	String find1AlarmConfirm();
	String find2Alarm();
	String find2AlarmConfirm();
	String find3Alarm();
	String find3AlarmConfirm();
	List<FairProd> findAllDailyAlarm();
	
}