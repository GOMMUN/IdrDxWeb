package com.idr.pdd.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.AnomalyDetection;
import com.idr.pdd.dto.CM0801;
import com.idr.pdd.dto.Monitoring;
import com.idr.pdd.dto.NotoperateContents;
import com.idr.pdd.mapper.AnomalyDetectionMapper;
import com.idr.pdd.mapper.DatasetDetailedMapper;
import com.idr.pdd.mapper.MonitoringMapper;

@Service
public class MonitoringService {

	@Autowired
	MonitoringMapper mapper;

	public List<Monitoring> findproduct(Monitoring param) {

		List<Monitoring> mtlist = mapper.findproduct(param);
		// 생산 필요 데이터

		for (int i = 0; i < mtlist.size(); i++) {

			int plantqty = mtlist.get(i).getPlanQty();
			int pordqty = mtlist.get(i).getProdQty();

			double percent = ((double)pordqty / (double)plantqty) * 100;
			
			percent=Math.round(percent);
			mtlist.get(i).setPerformancepercent(percent);
		}


		return mtlist;

	}

	public Monitoring findstorage(Monitoring param) {
		

		List<Monitoring> mtlist = mapper.findstorage(param);
		int mqty=0;
		int pqty=0;
		
		for(int i=0;i<mtlist.size();i++)
		{
			if(mtlist.get(i).getStoragename().contains("자재창고"))
			{
				mqty+=mtlist.get(i).getQty();
			}
			else if(mtlist.get(i).getStoragename().contains("제품창고"))
			{
				pqty+=mtlist.get(i).getQty();
			}
		}
		
		
		
		Monitoring mt= new Monitoring();
		mt.setMtotalqty(mqty);
		mt.setPtotalqty(pqty);
		
		return mt;
	}

	public Monitoring findreject(Monitoring param) {
		try {
			Monitoring mt= mapper.findreject(param);
			double percent=Math.round((double)mt.getTotalfailQty()/(double)mt.getTotalprodQty()*100);
			mt.setFailpercent(percent);
			
			return mt;
			
		}catch(Exception e)
		{
			e.printStackTrace();
			return null;
		}
		
	}

	public List<Monitoring> findnotoperate(Monitoring param) {
		try {
			List<Monitoring> mtlist=mapper.findnotoperate(param);

			return mtlist;
			
		}catch(Exception e)
		{
			e.printStackTrace();
			return null;
		}
		
	}

}
