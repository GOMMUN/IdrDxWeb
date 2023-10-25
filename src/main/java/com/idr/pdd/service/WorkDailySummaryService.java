package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.WorkDailySummary;
import com.idr.pdd.mapper.WorkDailySummaryMapper;

@Service
public class WorkDailySummaryService {

   @Autowired
   WorkDailySummaryMapper mapper;
   
   public List<WorkDailySummary> findAllName(String plant){
      
      return mapper.findAllName(plant);
   }

}