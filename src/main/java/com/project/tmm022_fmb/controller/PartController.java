package com.project.tmm022_fmb.controller;

import com.project.tmm022_fmb.service.PartService;
import com.project.tmm022_fmb.service.LineService;
import com.project.tmm022_fmb.model.Part;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parts")
public class PartController {

    @Autowired
    private PartService partService;

    @Autowired
    private LineService lineService;

    @GetMapping("/validatePartNumber")
    public ResponseEntity<?> validatePartNumber(
            @RequestParam String partNumber,
            @RequestParam int globalParameter,
            @RequestParam String unitId,
            @RequestParam(required = false) String groupId,
            @RequestParam(required = false) String lineId,
            @RequestParam(required = false) String partId) {
        return ResponseEntity.ok(partService.validatePartNumber(partNumber, globalParameter, unitId, groupId, lineId, partId));
    }

    @GetMapping("/groupLOV")
    public ResponseEntity<?> getGroupLOV() {
        return ResponseEntity.ok(partService.getGroupLOV());
    }

    @GetMapping("/editGroupLOV")
    public ResponseEntity<?> getEditGroupLOV() {
        return ResponseEntity.ok(partService.getEditGroupLOV());
    }

    @GetMapping("/validateGroupId")
    public ResponseEntity<?> validateGroupId(
            @RequestParam String groupId,
            @RequestParam String groupName,
            @RequestParam int globalParameter,
            @RequestParam String unitId) {
        return ResponseEntity.ok(partService.validateGroupId(groupId, groupName, globalParameter, unitId));
    }

    @GetMapping("/validateUnitID")
    public ResponseEntity<?> validateUnitID(
            @RequestParam String unitId,
            @RequestParam String unitName) {
        return ResponseEntity.ok(partService.validateUnitID(unitId, unitName));
    }

    @GetMapping("/validateLineID")
    public ResponseEntity<?> validateLineID(
            @RequestParam String lineId,
            @RequestParam String lineDescription,
            @RequestParam String unitId,
            @RequestParam String groupId) {
        return ResponseEntity.ok(lineService.validateLineID(lineId, lineDescription, unitId, groupId));
    }

    @PostMapping("/savePart")
    public ResponseEntity<?> savePart(@RequestBody Part part) {
        return ResponseEntity.ok(partService.savePart(part));
    }

    @PutMapping("/updatePart")
    public ResponseEntity<?> updatePart(@RequestBody Part part) {
        return ResponseEntity.ok(partService.updatePart(part));
    }
}
