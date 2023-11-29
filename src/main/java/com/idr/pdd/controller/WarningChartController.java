package com.idr.pdd.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("warningChart")
public class WarningChartController {

	@GetMapping("")
    public String init() {
        return "page/warningChart";
    }
}
