package com.idr.pdd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.Factory;
import com.idr.pdd.dto.Material;
import com.idr.pdd.dto.Vendor;
import com.idr.pdd.service.FactoryInfoService;
import com.idr.pdd.service.MaterialMasterService;
import com.idr.pdd.service.SupplierInfoService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("material")
public class MaterialMasterController {

	@Autowired
	private MaterialMasterService service;
	
	@GetMapping("")
    public String init() {
        return "page/materialMaster";
    }
	
	@ResponseBody
	@GetMapping("/find")
    public List<Material> find() {
		List<Material> list = service.findAll();
		return list;
    }
}
