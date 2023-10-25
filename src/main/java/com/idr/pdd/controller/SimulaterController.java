package com.idr.pdd.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.Code;
import com.idr.pdd.dto.Factory;
import com.idr.pdd.dto.LeadTime;
import com.idr.pdd.dto.Location;
import com.idr.pdd.dto.ModelNM;
import com.idr.pdd.dto.PerByProductPlan;
import com.idr.pdd.dto.Shift;
import com.idr.pdd.dto.Storage;
import com.idr.pdd.dto.performanceByProcess;
import com.idr.pdd.mapper.SimulPerformanceDataMapper;
import com.idr.pdd.service.CodeService;
import com.idr.pdd.service.LeadTimeService;
import com.idr.pdd.service.PerByProcessService;
import com.idr.pdd.service.PerByProductPlanService;
import com.idr.pdd.service.StorageInfoService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/simulator")
public class SimulaterController {

	@GetMapping("")
    public String init() {
        return "page/simulater";
    }

}
