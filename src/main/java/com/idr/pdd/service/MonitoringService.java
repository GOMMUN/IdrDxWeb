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

	public Monitoring findproduct(Monitoring param) {

		try {
			Monitoring mt = mapper.findproduct1(param);
			Monitoring mt2 = mapper.findproduct2(param);
			mt.setAmPlanQty(mt2.getAmPlanQty());
			mt.setPmPlanQty(mt2.getPmPlanQty());
			return mt;
		} catch (Exception e) {
			Monitoring mt = new Monitoring();
			return null;
		}

	}

	public Monitoring findstorage(Monitoring param) {

		List<Monitoring> mtlist = mapper.findstorage(param);
		int mqty = 0;
		int pqty = 0;

		for (int i = 0; i < mtlist.size(); i++) {
			if (mtlist.get(i).getStoragename().contains("자재창고")) {
				mqty += mtlist.get(i).getQty();
			} else if (mtlist.get(i).getStoragename().contains("제품창고")) {
				pqty += mtlist.get(i).getQty();
			}
		}

		Monitoring mt = new Monitoring();
		mt.setMtotalqty(mqty);
		mt.setPtotalqty(pqty);

		return mt;
	}

	public Monitoring findreject(Monitoring param) {

		try {
			Monitoring mt = mapper.findreject1(param);
			Monitoring mt2 = mapper.findreject2(param);
			mt.setRi01(mt2.getRi01());
			mt.setRi02(mt2.getRi02());
			mt.setRi03(mt2.getRi03());
			mt.setRi04(mt2.getRi04());

			return mt;
		} catch (Exception e) {
			return null;
		}

	}

	public List<Monitoring> findnotoperate(Monitoring param) {
		try {
			List<Monitoring> mtlist = mapper.findnotoperate(param);

			return mtlist;

		} catch (Exception e) {

			return null;
		}

	}

}
