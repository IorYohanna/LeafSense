package com.plantapp.dto;

import java.time.Instant;
import java.util.List;

public record ErrorResponse(
        Instant timestamp,
        int status,
        String error,
        List<String> messages,
        String path
) {
    public static ErrorResponse of(int status, String error, List<String> messages, String path) {
        return new ErrorResponse(Instant.now(), status, error, messages, path);
    }
}
