package com.project.tmm022_fmb.controller;

import com.project.tmm022_fmb.service.LineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/line")
public class LineController {

    @Autowired
    private LineService lineService;

    @PostMapping("/validate")
    public ResponseEntity<?> validateLineID(
            @RequestParam String lineID,
            @RequestParam String lineDesc,
            @RequestParam String unitID,
            @RequestParam String groupID,
            @RequestParam int globalParam) {
        
        boolean isValid = lineService.validateLineID(lineID, lineDesc, unitID, groupID, globalParam);
        
        if (isValid) {
            return ResponseEntity.ok("Line ID and Line Description are valid.");
        } else {
            return ResponseEntity.badRequest().body("Invalid Line ID or Line Description.");
        }
    }

    @GetMapping("/lov")
    public ResponseEntity<?> getLineLOV(
            @RequestParam String unitID,
            @RequestParam String groupID,
            @RequestParam int globalParam) {
        
        return ResponseEntity.ok(lineService.getLineLOV(unitID, groupID, globalParam));
    }

    @PostMapping("/navigate")
    public ResponseEntity<?> navigateLineInfo(
            @RequestParam String unitID,
            @RequestParam String unitName,
            @RequestParam String groupID,
            @RequestParam String groupName,
            @RequestParam String lineID,
            @RequestParam String lineDesc) {
        
        String result = lineService.navigateLineInfo(unitID, unitName, groupID, groupName, lineID, lineDesc);
        
        if (result.equals("success")) {
            return ResponseEntity.ok("Navigation successful.");
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
}