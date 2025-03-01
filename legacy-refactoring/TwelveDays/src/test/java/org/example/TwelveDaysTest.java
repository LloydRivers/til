package org.example;

import org.junit.Test;

import static org.junit.Assert.assertEquals;


public class TwelveDaysTest {
    @Test
    public void testPrintDatOne() {
        TwelveDays twelveDays = new TwelveDays(1);
        String result = twelveDays.print();
        // Assert
        assertEquals("Hello", result);
    }

}
