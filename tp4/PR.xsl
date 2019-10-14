<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <title>PR.html - TP3</title>
                <meta charset="UTF-8"/>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            </head>
            <body class="w3-container">
                <h1 align="center"><b>Project Record</b></h1>
                <hr/>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <!-- METADATA -->
    <xsl:template match="metadata">
        <table class="w3-table">
            <tr>
                <th>Keyname:</th><td><xsl:value-of select="keyname"/></td>
                <th>Begin Date:</th><td><xsl:value-of select="bdate"/></td>
            </tr>
            <tr>
                <th>Title:</th><td><xsl:value-of select="title"/></td>
                <th>End Date:</th><td><xsl:value-of select="edate"/></td>
            </tr>
            <tr>
                <th>Subtitle:</th><td><xsl:value-of select="subtitle"/></td>
                <xsl:apply-templates select="supervisor"/>
            </tr>
        </table>
        <hr/>
        <hr/>
    </xsl:template>
    
            <xsl:template match="supervisor">
                <th>Supervisor:</th><td><a href="{./@homepage}"><xsl:value-of select="text()"/></a></td>        
            </xsl:template>
    
    
    <!-- WORKTEAM -->
    <xsl:template match="workteam">
        <h3><b>Workteam:</b></h3>
        <ol>
            <xsl:apply-templates select="member"/>
        </ol>
        <hr/>
        <hr/>
    </xsl:template>
    
            <xsl:template match="member">
                <li><xsl:value-of select="identifier"/> - <xsl:value-of select="name"/> - <xsl:value-of select="email"/> - <xsl:value-of select="git"/></li>        
            </xsl:template>
    
    
    <!-- ABSTRACT -->
    <xsl:template match="abstract">
        <h3><b>ABSTRACT:</b></h3>
        <xsl:apply-templates select="p"/>
        <hr/>
        <hr/>
    </xsl:template>
    
            <xsl:template match="p">
                <p><xsl:value-of select="text()"/><xsl:apply-templates select="b"/><xsl:apply-templates select="i"/><xsl:apply-templates select="u"/><xsl:apply-templates select="xref"/></p>
            </xsl:template>
    
                    <xsl:template match="b">
                        <b><xsl:value-of select="text()"/></b>
                        <xsl:apply-templates select="i"/>
                        <xsl:apply-templates select="u"/>
                        <xsl:apply-templates select="xref"/>
                    </xsl:template>
    
                    <xsl:template match="i">
                        <i><xsl:value-of select="text()"/></i>
                        <xsl:apply-templates select="b"/>
                        <xsl:apply-templates select="u"/>
                        <xsl:apply-templates select="xref"/>
                    </xsl:template>
                    
                    <xsl:template match="u">
                        <u><xsl:value-of select="text()"/></u>
                        <xsl:apply-templates select="b"/>
                        <xsl:apply-templates select="i"/>
                        <xsl:apply-templates select="xref"/>
                    </xsl:template>
    
                    <xsl:template match="xref">
                        <u><a href="{./@url}"><xsl:value-of select="text()"/></a></u>
                        <xsl:apply-templates select="b"/>
                        <xsl:apply-templates select="i"/>
                        <xsl:apply-templates select="u"/>
                    </xsl:template>
    
    
    <!-- DELIVERABLES -->
    <xsl:template match="deliverables">
        <h3><b>Deliverables:</b></h3>
        <ul>
            <xsl:apply-templates select="deliverable"/>
        </ul>
        <hr/>
    </xsl:template>
    
            <xsl:template match="deliverable">
                <li><a href="{./@path}"><xsl:value-of select="text()"/></a></li>      
            </xsl:template>
</xsl:stylesheet>